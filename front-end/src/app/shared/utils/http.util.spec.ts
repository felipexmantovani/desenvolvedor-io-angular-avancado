import { HttpUtil } from './http.util';

describe('http-util.spec | HttpUtil', () => {

  it('Deve retornar um objeto vazio', () => {
    const extract = HttpUtil.extractData({ anyKey: 'value' });
    expect(Object.keys(extract).length).toBe(0);
  });

  it('Deve retornar um objeto com os dados extraídos da chave "data"', () => {
    const extract = HttpUtil.extractData({ data: { email: 'teste@teste.com' } });
    expect(extract).toEqual({ email: 'teste@teste.com' });
  });

});
