export class Trace {
    name = ''
    report?: TraceReport = undefined
}
      
export class TraceReport {
    method: string
    url: string
    requestHeaders: string
    requestBody?: string
    responseStatus?: number
    responseHeaders: string
    responseBody: string
      
    constructor(
        method: string,
        url: string,
        requestHeaders: string,
        requestBody: string | undefined,
        responseStatus: number | undefined,
        responseHeaders: string,
        responseBody: string,
    ) {
        this.method = method
        this.url = url
        this.requestHeaders = requestHeaders
        this.requestBody = requestBody
        this.responseStatus = responseStatus
        this.responseHeaders = responseHeaders
        this.responseBody = responseBody
    }

    public log() {
        const yellow = '\x1b[93m';
        const red = '\x1b[31m';
        const reset = '\x1b[0m';
    
        let output = `${yellow}URL: ${red}${this.url}${reset}\n`;
    
        output += `${yellow}Request Method: ${red}${this.method.toUpperCase()}${reset}\n`;
    
        if (this.requestHeaders) {
            output += `${yellow}Request Header(s): ${red}${this.requestHeaders}${reset}\n`;
        }
    
        if (this.requestBody) {
            output += `${yellow}Request Body(s): ${red}${this.requestBody}${reset}\n`;
        }
    
        output += `${yellow}Response Status: ${red}${this.responseStatus}${reset}\n`;
        output += `${yellow}Response Header(s): ${red}${this.responseHeaders}${reset}\n`;
        output += `${yellow}Response Body: ${red}${this.responseBody}${reset}\n\n`;
    
        console.log(`===== ${yellow}${this.method.toUpperCase()} ${red}${this.url}${reset} =====\n\n`, output);
    }

}