## EXPENSE TRACKER

### 1. 금액 데이터의 타입

금액 데이터는 상황에 따라 다른 타입과 형식으로 처리되므로 아래 기준에 맞게 타입을 정리합니다.<br>
금액 데이터는 기본적으로 인풋에 값을 입력할 때 한국 통화 표시에 맞게 콤마를 붙여 string타입으로 formatting됩니다.

- **로컬에 저장 : 콤마를 제거하고 string으로 저장**<br>
  `localStorage.setItem('key', value.replaceAll(',', ''))`

- **로컬에서 값을 가져옴 : string값을 number타입으로 변경**<br>
  `parseInt(localStorage.getItem('key'))`

- **화면에 값을 렌더링 : 값에 통화표시 (콤마를 붙임)**<br>
  `value.toLocaleString('ko-KR')`
