<x-mail::message>
# Introduction

Para ativar a conta clique no botão abaixo.
<x-mail::button :url="$url">
    Ativar
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
