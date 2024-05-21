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
    applicationApiToken: 'uivso3e8mh70hadagairiyamswx',

    shineApiUrl: 'https://api.univ-shine.com/shine_server',
    shineToken: '00-11-22',
    shineInstanceId: 'instance19',

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