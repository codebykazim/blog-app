import conf from '../conf'
import {Client, Account, ID} from "appwrite"

export class AuthService{

    client=new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

    async createAccount({email,password,name}) {
        try {
            const userAccount=await this.account.create(ID.unique, email,password,name)

            if (userAccount) {
                //call login method
                return this.login({email,password});

            } else {
                return userAccount;
            }

        } catch (error) {
          throw error;
        }
    }

    async login({email,password}) {
        try {
            return await this.account.createEmailPasswordSession(email,password);

        } catch (error) {
           throw error;
        }
    }

    async getCurrentUser() {
        try {
            userAccount= await this.account.get();
            if (userAccount) {
                return userAccount;

            } else {
                return null;
            }

        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();

        } catch (error) {
            throw error;
        }
    }
}

const authService= new AuthService();

export default authService