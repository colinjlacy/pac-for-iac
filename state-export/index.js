import axios from "axios";

async function readFromStdin(stream) {
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    return Buffer.concat(chunks).toString('utf8');
}

function findName(obj) {
    switch (true) {
        case !!obj.branch:
            return obj.branch;
        case !!obj.pattern && !!obj.repository_id:
            return `${obj.repository_id}.${obj.pattern}`;
        case !!obj.name:
            return obj.name;
        case !!obj.team_id && !!obj.members:
            return `${obj.team_id}:${obj.members.map(x => x.username).join(',')}`;
        case !!obj.id:
            return obj.id;
        default:
            return "Unknown";
    }
}

function parseResources(state) {
    const resources = []
    state.values.root_module.child_modules.forEach(module => {
        module.resources.forEach(resource => {
            resources.push({
                type: resource.type,
                name: findName(resource.values),
                module: module.address,
            });
        });
    })
    return resources;
}


async function postState() {
    const input = await readFromStdin(process.stdin);
    const state = JSON.parse(input);
    const resources = parseResources(state);
    const response = await axios.post("http://localhost:8084/resources", {resources});
}

postState().then(() => process.exit(0));