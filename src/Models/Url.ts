const urlBaseInterView = 'https://interview.apireport.com/api/';
const AddInterViewInformation = urlBaseInterView + 'AddInterViewInformation';
const GetAllCompanies = urlBaseInterView + 'Company/GetAllCompanies';
const AddCompany = urlBaseInterView + 'Company/AddCompany';
const AddInterView = urlBaseInterView + 'AddInterView';
const AddInterViewCompany = urlBaseInterView + 'AddInterViewCompany';
const DeleteInformationInterview = urlBaseInterView + 'DeleteInformationInterview';
const DeleteInterview = urlBaseInterView + 'DeleteInterview';
const DeleteCompany = urlBaseInterView + 'DeleteCompany';
const UpdateInterViewInformation = urlBaseInterView + 'UpdateInterViewInformation';
const GetAllProcessByIdCompany = urlBaseInterView + 'Interview/GetAllInterviewsByIdCompany';
const GetAllInformationsByIdInterview = urlBaseInterView + 'InformationInterview/GetAllInformationsByInterviewId';

export const endpoints = {
   urlBaseInterView: urlBaseInterView,
   AddInterViewInformation: AddInterViewInformation,
   GetAllCompanies: GetAllCompanies,
   AddInterView: AddInterView,
   AddInterViewCompany: AddInterViewCompany,
   DeleteInformationInterview: DeleteInformationInterview,
   DeleteInterview: DeleteInterview,
   UpdateInterViewInformation: UpdateInterViewInformation,
   DeleteCompany: DeleteCompany,
   GetAllProcessByIdCompany : GetAllProcessByIdCompany,
   GetAllInformationsByIdInterview : GetAllInformationsByIdInterview,
   AddCompany : AddCompany
}