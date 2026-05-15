import 'react';
import 'react-bootstrap';

export default function Table() {
    return (
<div className="card shadow-sm border-0">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0" id="tabela">

          <thead className="table-dark text-center">
            <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>L</th>
            <th>A</th>
            <th>C</th>
            <th>Peso</th>
            <th>Peso Usado</th>
            <th>Custo</th>
            <th>Preço</th>
            <th>Frete</th>
            <th>Lucro</th>
            <th>%</th>
            <th>Ações</th>
          </tr>
          </thead>

          <tbody className="text-center"></tbody>

        </table>
      </div>
    </div>
    )
}