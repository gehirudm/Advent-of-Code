import { readFileSync } from "node:fs";

const fileContent = readFileSync('./data.txt', { encoding: 'utf-8' });
const stream = fileContent.trimEnd();

class Folder {
    public children: (File | Folder)[] = [];

    constructor(
        public name: string,
        public parent?: Folder
    ) { }

    public size() {
        return this.children.map(child => child.size()).reduce((acc, curr) => acc + curr, 0)
    }

    public push(item: File | Folder) {
        this.children = [...this.children, item]
    }

    public toString(level: number) {
        let str = "|-".repeat(level) + `📁 ${this.name}\n`;
        for (const child of this.children) {
            str += child.toString(level + 1);
        }
        return str
    }
}

class File {
    constructor(
        public name: string,
        private _size: number,
        public parent: Folder
    ) { }

    public size() {
        return this._size;
    }

    public toString(level: number) {
        let str =  "|-".repeat(level) + `📑 ${this.name}\n`;
        return str
    }
}



const handleLS = (currentDir: Folder, output: string[], foldersFlat: Folder[]) => {
    const files =
        output
            .map(line => {
                if (line.startsWith("dir")) {
                    const folder = new Folder(line.replace("dir ", ""), currentDir)
                    foldersFlat.push(folder)
                    return folder;
                } else {
                    return new File(line.split(" ")[1], +line.split(" ")[0], currentDir)
                }
            })
    
    currentDir.children = files;
}

type Command = {
    command: "cd" | "ls",
    args: string,
    result: string[]
}

const commands = [] as Command[];

for (const line of stream.split(/\r\n/)) {
    if (line.startsWith("$")) {
        // Command
        const [command, args] = line.replace("$ ", "").split(" ");

        commands.push({
            args,
            command: command as "cd" | "ls",
            result: []
        })
    } else {
        commands[commands.length - 1].result.push(line)
    }
}

let cwd = new Folder("/");

const fileTree = cwd;
const foldersFlat: Folder[] = [];

for (const command of commands) {
    switch (command.command) {
        case "cd":
            switch (command.args) {
                case "/":
                    break;
                case "..":
                    cwd = cwd.parent ?? cwd
                    break;
                default:
                    cwd = (cwd.children.find(item => item.name == command.args) ?? cwd) as Folder;
                    break;
            }
            break;
        case "ls":
            handleLS(cwd, command.result, foldersFlat)
            break;
        default:
            break;
    }
}

console.log(fileTree.toString(0));

// Find folders with size <= 100,000
const totSize = foldersFlat.filter(folder => folder.size() <= 100_000).reduce((acc, curr) => acc + curr.size(), 0)

console.log(totSize);