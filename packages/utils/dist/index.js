const s = (t, r) => {
  const { [r]: n, ...e } = t;
  return e;
}, l = ({ key: t, keys: r, obj: n }) => new Proxy(n, {
  get(e, i) {
    return Boolean(e[i]?.constructor) && Object.is(e[i].constructor, Object) ? t in e[i] ? e[i][t] : r.some((o) => o in e[i]) ? null : l({ key: t, keys: r, obj: e[i] }) : e[i];
  }
}), c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  omitProp: s,
  proxyLiteralsByKey: l
}, Symbol.toStringTag, { value: "Module" })), a = ({ mode: t, modes: r, config: n }) => l({ key: t, keys: r, obj: { mode: t, ...n } }), u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  configFrom: a
}, Symbol.toStringTag, { value: "Module" }));
function f({ e: t, onLoad: r }) {
  const n = new FileReader();
  let e;
  n.addEventListener("load", (i) => {
    r({ result: n.result, file: e });
  }, { once: !0 }), t.target.files?.[0] ? e = t.target.files[0] : t.dataTransfer.items && (t.dataTransfer.items?.[0].kind === "file" ? e = t.dataTransfer.items[0].getAsFile() : e = t.dataTransfer.files[0]), e && n.readAsText(e);
}
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  readFileAsText: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  u as Config,
  d as Filereader,
  c as Obj
};
