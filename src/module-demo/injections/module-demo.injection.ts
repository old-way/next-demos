import { Module } from "../../../../next/packages/injection/decorators/module.decorator";
import { OnModuleInit } from "@nestjs/common/interfaces/modules";
import { Logger } from "@nestjs/common";

@Module({
    authors: [
        {
            email: "admin@notadd.com",
            username: "notadd",
        },
    ],
    identification: "module-demo",
    name: "Module Demo",
    version: "2.0.0",
})
export class ModuleDemoInjection implements OnModuleInit {
    private readonly logger = new Logger("ModuleLoader");

    public onModuleInit() {
        this.logger.log("Module demo initialized");
    }
}
