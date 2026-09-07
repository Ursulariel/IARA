import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"

const sourcePath = resolve(
  process.argv[2] ?? ".tmp-bncc/ensino-fundamental.json"
)
const outputPath = resolve(process.argv[3] ?? "data/bncc-topics.json")

const source = JSON.parse(await readFile(sourcePath, "utf8"))
const contextNames = new Map(
  source.contextos_organizacao.map((context) => [context.id, context.nome])
)

const componentNames = {
  "ef-comp-lp": "Língua Portuguesa",
  "ef-comp-ma": "Matemática",
}

function resolveContext(id) {
  return typeof id === "string" ? (contextNames.get(id) ?? "") : ""
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

const topics = source.habilidades
  .filter((ability) => ability.componente in componentNames)
  .map((ability) => {
    const organization = ability.organizacao ?? {}
    const knowledgeObjects = unique(
      (ability.objetos_conhecimento ?? []).map(resolveContext)
    )
    const practiceId = organization.pratica_linguagem ?? ""
    const context =
      resolveContext(practiceId) ||
      resolveContext(organization.unidade_tematica) ||
      resolveContext(organization.eixo)

    return {
      code: ability.codigo,
      component: componentNames[ability.componente],
      years: ability.anos,
      title: knowledgeObjects.join(" / "),
      description: ability.texto,
      context,
      writing:
        typeof practiceId === "string" &&
        (practiceId.includes("producao-de-textos") ||
          practiceId.includes("escrita")),
    }
  })
  .sort((first, second) => first.code.localeCompare(second.code, "pt-BR"))

const catalog = {
  metadata: {
    document: "Base Nacional Comum Curricular — Ensino Fundamental (2018)",
    provenance:
      "Dados estruturados a partir da planilha exportada de downloadbncc.mec.gov.br em 23/06/2023.",
    dataset: "https://github.com/bncc-dev/bncc-dados",
    source:
      "https://raw.githubusercontent.com/bncc-dev/bncc-dados/refs/heads/main/dados/bncc-2018/ensino-fundamental.json",
    writingDefinition:
      "Redação reúne as habilidades de Língua Portuguesa cuja prática de linguagem é Escrita ou Produção de textos.",
  },
  topics,
}

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8")

const counts = topics.reduce(
  (result, topic) => {
    if (topic.component === "Língua Portuguesa") result.portuguese += 1
    if (topic.component === "Matemática") result.mathematics += 1
    if (topic.writing) result.writing += 1
    return result
  },
  { portuguese: 0, mathematics: 0, writing: 0 }
)

console.log(
  `Catálogo criado: ${counts.portuguese} de Língua Portuguesa, ${counts.mathematics} de Matemática e ${counts.writing} de Redação.`
)
