import { Extension } from "../../../../next/packages/injection/decorators/extension.decorator";

@Extension({
    authors: [
        {
            email: "admin@notadd.com",
            username: "notadd",
        },
    ],
    identification: "extension-demo",
    name: "Extension Demo",
    version: "2.0.0",
})
export class ExtensionDemoInjection {
}
