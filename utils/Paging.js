const Paging = {
  curPage: 1, // 현재 페이지 - 넘어 옴
  totRows: 0, // 전체 레코드 개수 - 쿼리 결과
  totPages: 0, // 전체 페이지 개수 - 계산 결과
  rowsPerPage: 5, // 페이지당 레코드 개수 - 정함
  pagesPerShow: 5, // 한 화면에 뿌려질 페이지 개수 - 정함
  startPageNo: 1, // 한 화면에 뿌려질 시작 페이지 번호 - 계산 결과
  endPageNo: 1, // 한 화면에 뿌려질 끝 페이지 번호 - 계산 결과
  startEndPageArr: [], // 한 화면에 뿌려질 시작 ~ 끝 페이지 번호 Array
  skipRowNoForQuery: 0, // 쿼리에서 시작 전 skip할 레코드 수 - 계산 결과
  startRowNoForQuery: 1, // 쿼리에서 시작 조건 - 계산 결과
  endRowNoForQuery: 1, // 쿼리에서 끝 조건 - 계산 결과
  calculate: (curPage, totRows) => {
    Paging.curPage = curPage;
    Paging.totRows = totRows;
    if (!curPage) {
      Paging.curPage = 1;
    }
    Paging.totPages = Math.ceil(Paging.totRows / Paging.rowsPerPage);
    if (Paging.totPages < Paging.curPage) {
      Paging.curPage = Paging.totPages;
    }
    Paging.startPageNo =
      Math.floor((Paging.curPage - 1) / Paging.pagesPerShow) *
        Paging.pagesPerShow +
      1;
    if (Paging.startPageNo < 1) {
      Paging.startPageNo = 1;
    }
    Paging.endPageNo = Paging.startPageNo + Paging.pagesPerShow - 1;
    if (Paging.totPages < Paging.endPageNo) {
      Paging.endPageNo = Paging.totPages;
    }
    Paging.startEndPageArr = [];
    for (let i = Paging.startPageNo; i <= Paging.endPageNo; i++) {
      Paging.startEndPageArr.push(i);
    }
    Paging.skipRowNoForQuery = (Paging.curPage - 1) * Paging.rowsPerPage;
    if (Paging.skipRowNoForQuery < 0) {
      Paging.skipRowNoForQuery = 0;
    }
    Paging.startRowNoForQuery = Paging.skipRowNoForQuery + 1;
    if (Paging.startRowNoForQuery < 1) {
      Paging.startRowNoForQuery = 1;
    }
    Paging.endRowNoForQuery = Paging.curPage * Paging.rowsPerPage;
    if (Paging.totRows < Paging.endRowNoForQuery) {
      Paging.endRowNoForQuery = Paging.totRows;
    }
  }
};

module.exports = Paging;
