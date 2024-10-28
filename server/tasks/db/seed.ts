import {execSync} from "child_process";

export default defineTask({
    meta: {
        name: "db:seed",
        description: "Run database seeder",
    },
    run({ payload, context }) {
        const runner = payload.runner ?? "pnpx";
        const command = `${runner} prisma db seed`;

        try {
            const stdout = execSync(command).toString();

            return {
                message: "Seeding completed successfully!",
                command,
                stdout,
            };
        } catch (error) {
            return {
                message: `Seeding failed. If you want to use a runner other than '${runner}', provide 'runner' in the payload of this task and try again.`,
                command,
                stdout: error.message
            };
        }
    },
});