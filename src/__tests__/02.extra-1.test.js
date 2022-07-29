import styled from "styled-components";
import React, { useEffect, useState } from "react";

export function usePokemon(query) {
  const [{ data, errors, status }, setState] = useState({
    data: null,
    errors: null,
    status: "idle",
  });

  useEffect(() => {
    setState(state => ({ ...state, errors: null, status: "pending" }));
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(r => {
        if (r.ok) {
          return r.json();
        } else {
          return r.text().then(err => {
            throw err;
          });
        }
      })
      .then(data => {
        setState({ data, errors: null, status: "fulfilled" });
      })
      .catch(err => {
        setState({ data: null, errors: [err], status: "rejected" });
      });
  }, [query]);

  return { data, status, errors };
}