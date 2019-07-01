# Async

[async](http://caolan.github.io/async/docs.html) 라이브러리 함수들을 직접 구현해보는 과제입니다.

## Set up

```sh
npm install
```

## Development

1. `npm test`를 실행해보세요. 테스트들이 실패하고 있죠?
2. 테스트가 실패하고 있는 함수 파일을 `lib` 디렉토리에서 찾아 차근차근 구현을 시작해보세요.
3. 함수에 대한 설명은 [async](http://caolan.github.io/async/docs.html)를 참고하세요.
4. `each`를 먼저 진행하시고, 그 다음 함수의 테스트 파일을 찾아 `describe.skip`이라고 되어 있는 부분을 `describe`로 수정하시고 진행하시면 됩니다. 하나의 함수에 대한 테스트를 통과시켰다면, 다음 함수의 테스트 파일을 찾아 똑같이 반복하며 진행하시면 됩니다.
5. **`lib/internal` 디렉토리는 수정하지 마세요.**

## Keep in mind

- 기본적으로 본인이 구현해야 하는 함수가 어떤 기능을 하는건지에 대한 이해는 물론 선행되어야 합니다. ([async](http://caolan.github.io/async/docs.html) 참고)
- 어떤 테스트가 통과되지 않는다면, 해당 테스트가 정확히 무엇을 테스트하려고 하는지 테스트 코드를 우선적으로 이해해야 합니다. 모든 테스트 코드는 `/mocha_test` 디렉토리내에 있습니다.
