export function getAll() {
  return fetch("/api/tickets").then((res) => res.json());
}

export function deleteOne(id, options) {
  return fetch(`/api/tickets/${id}`, options).then((res) => res.json());
}

export function getYourTickets(userid) {
  return fetch(`/api/tickets/filters/yourtickets/${userid}`).then((res) =>
    res.json()
  );
}

export function getbyCategory(category) {
  return fetch(`/api/tickets/filters/category/${category}`).then((res) =>
    res.json()
  );
}
