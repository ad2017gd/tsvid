export class Logger {
    public name : string;
    constructor(name : string) {
        this.name = name;
    }

    public printnl(msg : string) {
        let date = new Date();
        process.stdout.write(`${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}.${Math.floor(date.getMilliseconds()/100)} [${this.name}]: ${msg}`)
    }
    public print(msg : string) {
        this.printnl(msg+"\n");
    }
    
}