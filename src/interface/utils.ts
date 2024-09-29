

export default interface ClientInterface {
    idclientes: number;
    nombres: string;
}

export interface ModuleInterface {
    module: 'Sells' | "Sells-Restaurant" | 'Inventory'
}

export type Platforms = "ios" | "android" | "windows" | "macos" | "web"