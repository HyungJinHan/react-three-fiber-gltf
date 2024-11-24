# r3f GLTF Web Study

## 모델링 최적화 관련

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

### 모델링 수정 프로세스

1. 기존 라이노 파일인 `.3dm` → `.fbx ` Export
   - Material 적용 X / Layer만 각 파트에 적용
2. Blender를 통해 `.fbx` 모델링 파일 Import
3. 기존에 Layer로 묶여있는 상태(parent의 children 상태)의 각 파트를 파트 별로 parent에서 분리
4. Join(단축키 J)하기 전에 각 Layer에 포함된 파트 별로 Material 작업 진행
   - 추후, Join 취소를 Material을 통해 진행할 수 있기 때문에 세부적으로 Material 지정이 중요
5. `.glb`로 Export

## Dependencies

### 사용한 라이브러리

> [!NOTE]
>
> 해당 기능 구현을 위한 필수 사항이 아닌 라이브러리는 `+` 표 시

```diff
"@react-three/drei": "^9.117.3",
"@react-three/fiber": "^8.17.10",
"@react-three/postprocessing": "^2.16.3",
"@types/three": "^0.170.0",
+"@types/lodash": "^4.17.13",
"r3f-perf": "^7.2.3",
+"react-router-dom": "^6.28.0",
"three": "0.160.0",
+"typescript": "^4.4.2",
```

### Docs

- [pmnd.rs](https://docs.pmnd.rs/)
