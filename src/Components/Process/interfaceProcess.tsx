import { Company, Process } from "../../Models/InterviewModel";

export interface PropsProcessView{
    company:Company,
    processes:Process[],
    submitProcess: (e:React.FormEvent<HTMLFormElement>) => void
}
