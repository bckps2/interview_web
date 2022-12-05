const urlBaseInterView = 'https://interview.apireport.com/api/Interview/';
const urlBaseCompany = 'https://interview.apireport.com/api/Company/';
const urlBaseProcess = 'https://interview.apireport.com/api/Process/';

export const endpointsCompany = {
   GetCompanyById: urlBaseCompany + 'GetCompanyById',
   GetAllCompanies: urlBaseCompany + 'GetAllCompanies',
   AddCompany: urlBaseCompany + 'AddCompany',
   DeleteCompany: urlBaseCompany + 'DeleteCompany'
}

export const endpointsProcess = {
   AddProcess: urlBaseProcess + 'AddProcess',
   GetAllProcess: urlBaseProcess + 'GetAllProcess',
   GetByIdCompany: urlBaseProcess + 'GetByIdCompany',
   DeleteProcess: urlBaseProcess + 'DeleteProcess'
}

export const endpointsInterview = {
   GetAllInterviews: urlBaseInterView + 'GetInterviews',
   GetByIdProcess: urlBaseInterView + 'GetByIdProcess',
   GetInterviewById:urlBaseInterView + 'GetInterviewById',
   AddInterview: urlBaseInterView + 'AddInterview',
   DeleteInterview: urlBaseInterView + 'DeleteInterview',
   UpdateInterview: urlBaseInterView + 'UpdateInterview'
}