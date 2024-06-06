import useAxios from 'library/axios'; 

import { IPasswordChange } from '../models/User';

const _ = () => {

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
    const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
    const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
    const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
    const sixCharsOrGreater = /.{6,}/g; // six characters or more

    const passwordTracker = (password: string) : 
            {uppercase: boolean, lowercase: boolean, number: boolean, specialChar: boolean, sixCharsOrGreater: boolean } => ({
        uppercase: password.match(atLeastOneUppercase) !== null,
        lowercase: password.match(atLeastOneLowercase) !== null,
        number: password.match(atLeastOneNumeric) !== null,
        specialChar: password.match(atLeastOneSpecialChar) !== null,
        sixCharsOrGreater: password.match(sixCharsOrGreater) !== null,
    })

    const passwordStrength = (password: string) : number => Object.values( passwordTracker(password) )
        .filter( (value) => value ).length

  const isPasswordStrong = (password: string) : boolean => passwordStrength(password) === 5

    const axios = useAxios();

    const changePassword = async (passwordChange: IPasswordChange) => 
        await (await axios.post('/api/identity/account/change-password', passwordChange)).data;

    const getDashboard = async ()  => {
        const {data} = (await axios.get('/crm/bankUser/getDashboard'));
        return await data;
    }

    return {
       
        changePassword,
        isPasswordStrong,
       
        getDashboard   
    } 
}

export default _;