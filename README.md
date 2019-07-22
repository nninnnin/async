# Async

[async](http://caolan.github.io/async/v3/) 라이브러리 함수들을 직접 구현해보는 과제입니다.

## Set up

```sh
yarn install (npm install)
```

## Development

```sh
yarn test (npm test)
```

1. 테스트들이 실패하고 있죠?
2. 테스트가 실패하고 있는 함수 파일을 `lib` 디렉토리에서 찾아 차근차근 구현을 시작해보세요.
3. 함수에 대한 설명은 각 함수 파일에 있는 주석이나 [async](http://caolan.github.io/async/docs.html)를 참고하세요.
4. `each`를 먼저 진행하시고, 그 다음 함수 테스트 파일(`/mocha_test`)을 찾아 `describe.skip`이라고 되어 있는 부분을 모두 `describe`로 수정하시고 진행하시면 됩니다.
5. **`lib/internal` 디렉토리는 수정하지 마세요.**

## Keep in mind

- 기본적으로 본인이 구현해야 하는 함수가 어떤 기능을 하는건지에 대한 이해는 물론 선행되어야 합니다. ([async](http://caolan.github.io/async/docs.html) 참고)
- 어떤 테스트가 통과되지 않는다면, 해당 테스트가 정확히 무엇을 테스트하려고 하는지 테스트 코드를 우선적으로 이해해야 합니다.
