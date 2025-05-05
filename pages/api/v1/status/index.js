export default function status(reqeust, response) {
  response.status(200).json({ chave: "valor" });
  // .send("alunos do curso.dev são acima da média");
}
