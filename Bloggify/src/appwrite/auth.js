import config from "../config/config,js";
import { Client, Account, ID } from "appwrite";

export class AuthServiceClass {
  client = new Client();
  account;

  constructor() {
    //we are not initializing the client and account until the object is exported
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }
  //the above method is enough to connect Appwrite services and use the CRUD to make the changes
  //But if we do not want the Appwrite dependency, and connect to any DB we want, we need to write some custom CRUD
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name); //ID.unique() appwrite builtin function to generate unique IDs,
      //you need to pass ID as first parameter for create operation in appwrite
      if(userAccount){
        //call another method like login or redicrect to some page
       return this.login({email, password})
      }else{
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({email, password}){
    try {
       return await this.account.createEmailSession(email, password);
    } catch (error) {
        throw error;
    }
  } 

  async getCurrentUser(){
    try {
      return await this.account.get();
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        throw error;
    }
  }
}

const authService = new AuthServiceClass();
//now we create the object of the class to let the user use the class contents directly rather than the class
//if we export the class, we have to create the object again, so it is better to export object

export default authService;
