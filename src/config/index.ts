export interface DynamicConfig {
    apiUrl: string,
    applicationApiToken: string,

    shineApiUrl: string,
    shineToken: string,
    shineInstanceId: string,
    
    environment: 'DEV' | 'TST' | 'ACK' | 'PROD'
}

export const defaultConfig : DynamicConfig = {
    //apiUrl: 'http://localhost/Welios',
    apiUrl: 'http://skrapi.univ-soft.com/',
    applicationApiToken: '4fbsar144jfko8vfjx005ipaed',

    shineApiUrl: 'https://api.univ-shine.com/shine_server',
    shineToken: 's7sfnb1qk9h7pq43vibtehxgh1',
    shineInstanceId: 'instance22',

    environment: 'DEV'
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