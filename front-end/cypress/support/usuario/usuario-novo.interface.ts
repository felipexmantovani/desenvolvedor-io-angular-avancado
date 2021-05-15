export interface UsuarioNovo {
  image: string;
  form: {
    email: string;
    password: string;
    passwordMsgErro: string;
    passwordConfirm: string;
    btnSubmit: string;
  };
}
