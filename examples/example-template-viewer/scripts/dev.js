import {Command} from "@prpsake/utils";

const db = Command.command({
  title: "db",
  color: "blue",
  cmd: "json-server",
  args: ["db.json", "--watch", "--host", "localhost", "--port", "3001"],
  stdout: ({title, content, log, res}) => {
    const urlMatch = content.includes("http://localhost:3001");
    const methodMatch = /(GET|POST|PUT|PATCH|DELETE|Error)/.test(content);

    if (urlMatch || methodMatch) {
      log(Command.prependTitleToLine(content, title));
      if (urlMatch) res();
    }
  },
});

const vite = Command.command({
  color: "yellow",
  cmd: "vite",
  args: ["--force"],
  stdout: true,
});

db().then(vite).catch(console.log);
