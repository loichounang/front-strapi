export interface DynamicConfig {
    apiUrl: string,
    environment: 'DEV' | 'TST' | 'ACK' | 'PROD',

    useReCAPTCHA: boolean,
    siteKeyReCAPTCHA: string
}

export const defaultConfig : DynamicConfig = {
    //apiUrl: 'http://localhost/Welios',
    // apiUrl: 'http://localhost:45073',
    apiUrl: 'http://localhost:1337',

    environment: 'DEV',

    useReCAPTCHA: false,
    siteKeyReCAPTCHA: ''
}

class GlobalConfig {
    config: DynamicConfig = defaultConfig;
    notDefinedYet = true;

    public get() : DynamicConfig {
        if(this.notDefinedYet) {
            throw new Error(
                "Global config has been defined yet. Be sure "
            );
        } else {
            return this.config;
        }
    }

    public set(value : DynamicConfig) : void {
        if(this.notDefinedYet) {
            this.config = value;
            this.notDefinedYet = false;
        } else {
            throw new Error(
                "Global config has already been defined and now has been call second time. This is probably not intended."
            )
        }
    }
}


export const globalConfig = new GlobalConfig();

export const globalConfigUrl = 'config.json'