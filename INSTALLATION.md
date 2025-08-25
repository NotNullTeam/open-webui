
# 安装说明

## 使用 Kustomize 安装 Ollama 与 Open WebUI

适用于仅 CPU 的 Pod：

```bash
kubectl apply -f ./kubernetes/manifest/base
```

适用于启用 GPU 的 Pod：

```bash
kubectl apply -k ./kubernetes/manifest
```

## 使用 Helm 安装 Ollama 与 Open WebUI

先打包 Helm chart：

```bash
helm package ./kubernetes/helm/
```

适用于仅 CPU 的 Pod：

```bash
helm install ollama-webui ./ollama-webui-*.tgz
```

适用于启用 GPU 的 Pod：

```bash
helm install ollama-webui ./ollama-webui-*.tgz --set ollama.resources.limits.nvidia.com/gpu="1"
```

查看 `kubernetes/helm/values.yaml` 文件以了解可自定义的参数
