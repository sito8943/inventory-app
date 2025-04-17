export const MovementTypes = {
  IN: 1,
  OUT: 2,
};

export const UniqueColumns = ["name"]

export const types = [
  {
    id: 1,
    label: "in",
  },
  {
    id: 2,
    label: "out",
  },
];

export class MovementDto {
  id = 0;
  movement = 0;
  input = 0;
}
