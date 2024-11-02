export interface Squad {
    id: string;
    turmaId: string;
    empresaId: string;
    mentorId: string;
    name: string;
    allocatedMentorEmail: string
  }

export const initialValueSquad: Squad = {
    id: '',
    turmaId: '',
    name: '',
    mentorId: '',
    allocatedMentorEmail: "",
    empresaId: ""
};