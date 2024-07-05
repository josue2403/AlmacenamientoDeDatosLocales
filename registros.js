document.addEventListener("DOMContentLoaded", function () {
  const registrosTabla = document.getElementById("registrosTabla");

  // Obtiene los registros del localStorage
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (usuarios.length > 0) {
    usuarios.forEach((registro, index) => {
      const row = registrosTabla.insertRow();
      row.insertCell(0).textContent = registro.nombre;
      row.insertCell(1).textContent = registro.apellido;
      row.insertCell(2).textContent = registro.email;
      row.insertCell(3).textContent = registro.cedula;
      row.insertCell(4).textContent = registro.direccion;
      row.insertCell(5).textContent = registro.telefono;
      const deleteCell = row.insertCell(6);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
        confirmDeleteRegistro(index);
      });
      deleteCell.appendChild(deleteButton);
    });
  } else {
    const row = registrosTabla.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 7;
    cell.textContent = "No hay registros disponibles.";
  }
});

function confirmDeleteRegistro(index) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteRegistro(index);
      Swal.fire(
        'Eliminado!',
        'El registro ha sido eliminado.',
        'success'
      )
    }
  });
}

function deleteRegistro(index) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.splice(index, 1);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  location.reload(); // Recarga la página para actualizar la lista de registros
}
