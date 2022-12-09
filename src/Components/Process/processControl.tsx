import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Company, Process } from "../../Models/InterviewModel";
import { endpointsCompany, endpointsProcess } from "../../Models/Url";
import { addProcessState, processesState } from "../../redux/reducers/processSlice";
import { RootState } from "../../redux/store/store";
import { GetById, requestAdd } from "../../Services/RequestService";
import { ProcessView } from "./processView";

let idParams = 0;
let isLoading = false;
let company = {} as Company;

export function ProcessControl() {

    let { id } = useParams();
    const dispatch = useDispatch();
    const processSlice = useSelector((state: RootState) => state.processInterview);

    useEffect(() => {
        if (!isNaN(Number(id))) {
            if (!isLoading || Number(id) !== idParams) {
                idParams = Number(id);
                isLoading = true;
                GetById(endpointsCompany.GetCompanyById, Number(id))
                    .then((res: Company) => {
                        if (res) {
                            company = res;
                            dispatch(processesState(res.process));
                        }
                    });
            }
        }
    }, [dispatch, id, processSlice.processes]);


    function submitProcess(e: React.FormEvent<HTMLFormElement>) {
        requestAdd(endpointsProcess.AddProcess, 'process', e)
            .then((res: Process) => {
                if (res) {
                    dispatch(addProcessState(res));
                }
            });
    }

    return (
        <ProcessView submitProcess={submitProcess} company={company} processes={processSlice.processes} />
    );
}