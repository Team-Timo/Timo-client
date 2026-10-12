// 지금 동시에 열려 있는 모달 개수를 센다. 모달이 열릴 때 그 시점의 개수를 받아가고
// (acquire), 닫힐 때 반납해서(release) 중첩 깊이만 반영하도록 한다.
let openModalCount = 0;

export const acquireModalStackIndex = (): number => {
  const index = openModalCount;
  openModalCount += 1;
  return index;
};

export const releaseModalStackIndex = (): void => {
  openModalCount = Math.max(0, openModalCount - 1);
};
