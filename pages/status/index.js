import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdatedAt({ data }) {
  const updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus({ data }) {
  return (
    <>
      <h2>Databse</h2>
      <div>Versão: {data.dependencies.database.version}</div>
      <div>
        Conexoes abertas: {data.dependencies.database.opened_connections}
      </div>
      <div>Conexoes máximas: {data.dependencies.database.max_connections}</div>
    </>
  );
}

export default function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  if (isLoading) return <div>Carregando...</div>;

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt data={data} />
      <DatabaseStatus data={data} />
    </>
  );
}
