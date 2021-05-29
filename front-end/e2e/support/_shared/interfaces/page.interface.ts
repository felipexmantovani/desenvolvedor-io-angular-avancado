export interface Page {
  breadcrumb: string;
  title: string;
  toaster: {
    btnClose: string,
    element: string,
    msg: string,
  };
  search: {
    input: string;
    btnLupa: string;
  }
}
