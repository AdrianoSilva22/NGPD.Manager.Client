import toastr from "toastr"


toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "showDuration": 300,
    "hideDuration": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 3000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export function mostrarMensagem(titulo: string, mensagem: string, tipo: ToastrType) {
    toastr[tipo](mensagem, titulo)
}

export function mensagemErro(mensagem: string) {
    mostrarMensagem('Erro', mensagem, 'error')
}

export function mensagemSucesso(mensagem: string) {
    mostrarMensagem('Sucesso', mensagem, 'success')
}

export function mensagemAlerta(mensagem: string) {
    mostrarMensagem('Alerta', mensagem, 'warning')
}