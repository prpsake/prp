import { Model } from "@prpsake/template-viewer"


interface Party {
  name: string
  organisation: string
  street: string
  streetNumber: string
  postOfficeBox: string
  postalCode: string
  locality: string
  countryCode: string
  person: string
  email: string
  threema: string
  iban: string
  uid: string
}


const Party: Model<Party> = {
  name: "",
  organisation: "",
  street: "",
  streetNumber: "",
  postOfficeBox: "",
  postalCode: "",
  locality: "",
  countryCode: "",
  person: "",
  email: "",
  threema: "",
  iban: "",
  uid: ""
}


export default Party
