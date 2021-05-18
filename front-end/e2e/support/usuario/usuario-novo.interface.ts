export interface UsuarioNovo {
  image: string;
  form: {
    email: string;
    password: string;
    passwordMsgErro: string;
    confirmPassword: string;
    btnSubmit: string;
  };
}
