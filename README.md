# Async

[async](http://caolan.github.io/async/v3/) 라이브러리 함수들을 직접 구현해보는 과제입니다.

## Restrictions

- **⛔️ 모든 변수 선언은 `var`를 이용하세요.**
- **⛔️ 특별한 언급이 없는 한, `Promise`, `async/await`은 사용할 수 없습니다.**

## Set up

- 과제 디렉토리 내에서 아래 명령어를 실행하셔야 합니다.

```sh
npm install
```

## Development

- 과제 디렉토리 내에서 아래 명령어를 실행하셔야 합니다.

```sh
npm test
```

## TODO

1. 테스트가 실패하고 있는 함수 파일을 `lib` 디렉토리에서 찾아 차근차근 구현을 시작해보세요.
2. 함수에 대한 설명은 각 함수 파일에 있는 주석이나 [async](https://caolan.github.io/async/v3/)를 참고하세요.
3. 번호 순으로 각 함수의 테스트 파일(`/mocha_test`)을 찾아 `describe.skip`이라고 되어 있는 부분을 하나씩 `describe`로 수정하시고 진행하시면 됩니다.

## References

- [AsyncFunction()](https://caolan.github.io/async/v3/global.html) 문서를 반드시 읽어보세요. (특히 에러 관련 사항을 자세히 읽어보세요.)

## Keep in mind

- 본인이 구현하는 함수의 기능에 대한 이해가 선행되어야 합니다. ([async](https://caolan.github.io/async/v3/) 참고)
- 특정 테스트가 통과되지 않는다면, 해당 테스트 코드의 의도와 내용을 우선 명확히 이해해야 합니다.
