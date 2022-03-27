export interface IRelation {
  id: string;
  name: string;
}
export interface IPosition {
  id: string;
  name: string;
}

export interface IState {
  loading: boolean;
  error: boolean;
  success: boolean;
}

export interface IPayload {
  clientId: string;
  firstName: string;
  lastName: string;
  relation: string;
  position: string;
  companyName?: string;
}
