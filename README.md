# GLTF 모델링 웹 테스트

## 최적화 관련

### gltf-pipeline

```bash
npm i -g gltf-pipeline # 1. gltf-pipeline 설치

gltf-pipeline -i <modeling-original.glb> -d -o <modeling-draco.glb> --draco.quantizePositionBits 14 # 2. 최적화 진행 (용량 줄임)
```

- 기억하기 위한 메모 용도로, 자세한 사항은 추가 예정

### gltfjsx

> [!TIP]
>
> [https://gltf.pmnd.rs/](https://gltf.pmnd.rs/) -> 웹에서 쉽게 사용 가능한 사이트

```bash
# 1. gltfjsx 설치
npm i -g gltfjsx

# 2. 모델링 컴포넌트화 진행
npx gltfjsx tripod-draco.glb --tranform --types
# --tranform : 컴포넌트 변환
# --types : TypeScript 타입 출력
```
