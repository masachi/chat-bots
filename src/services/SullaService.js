export class SullaService {
    constructor(){}

    static getInstance() {
        if (!this.instance) {
            this.instance = new SullaService();
        }

        return this.instance;
    }

    listenEvents(client) {
        client.onMessage(message => {
            console.error("message", JSON.stringify(message));
            if (message.body === 'Hi') {
                client.sendText(message.from, '👋 Hello from sulla!');
            }
        });
    }
}