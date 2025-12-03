export class Logger {

    private formatter() {

    }

    error(message: string) {
        return console.error(message)
    }

    success(message: string) {
        return console.log(message)
    }
}