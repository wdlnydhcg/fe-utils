export interface IILLAWebSocketOptions {
    repeat: number;
    lockReconnect: boolean;
    forbidReconnect: boolean;
    pingTimeoutId: number;
    pongTimeoutId: number;
    isOnline: boolean;
}
export default abstract class ILLAWebSocket {
    ws: WebSocket | null;
    url: string;
    options: IILLAWebSocketOptions;
    protected constructor(url: string);
    abstract onMessageCallback(event: MessageEvent): void;
    abstract onOpenCallback(): void;
    abstract onOnlineChangeCallback(isOnline: boolean): void;
    private createWebsocket;
    private initEventHandle;
    private reconnect;
    private heartCheck;
    private heartStart;
    private heartReset;
    close(): void;
    send(message: string): void;
}
