import React from 'react';
import { useLocation } from 'react-router-dom';


export function TeamDetailPage() {

  const location = useLocation();
  const name = location.data.name;
  const ID = location.data.id;

  return <div><b>{name} - ID: {ID}</b></div>;
}
