###############################################################################
#
#  Welcome to Baml! To use this generated code, please run the following:
#
#  $ pip install baml-py
#
###############################################################################

# This file was generated by BAML: please do not edit it. Instead, edit the
# BAML files and re-generate this code.
#
# ruff: noqa: E501,F401
# flake8: noqa: E501,F401
# pylint: disable=unused-import,line-too-long
# fmt: off
from typing import Any, Dict, List, Optional, Union, TypedDict, Type, Literal
from typing_extensions import NotRequired

import baml_py

from . import types
from .types import Checked, Check
from .type_builder import TypeBuilder


class BamlCallOptions(TypedDict, total=False):
    tb: NotRequired[TypeBuilder]
    client_registry: NotRequired[baml_py.baml_py.ClientRegistry]


class AsyncHttpRequest:
    __runtime: baml_py.BamlRuntime
    __ctx_manager: baml_py.BamlCtxManager

    def __init__(self, runtime: baml_py.BamlRuntime, ctx_manager: baml_py.BamlCtxManager):
      self.__runtime = runtime
      self.__ctx_manager = ctx_manager

    
    async def ExtractResume(
        self,
        resume: str,
        baml_options: BamlCallOptions = {},
    ) -> baml_py.HTTPRequest:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb # type: ignore (we know how to use this private attribute)
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      return await self.__runtime.build_request(
        "ExtractResume",
        {
          "resume": resume,
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
        False,
      )
    
    async def HelloWorld(
        self,
        
        baml_options: BamlCallOptions = {},
    ) -> baml_py.HTTPRequest:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb # type: ignore (we know how to use this private attribute)
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      return await self.__runtime.build_request(
        "HelloWorld",
        {
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
        False,
      )
    
    async def Initial(
        self,
        messages: List[types.Message],
        baml_options: BamlCallOptions = {},
    ) -> baml_py.HTTPRequest:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb # type: ignore (we know how to use this private attribute)
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      return await self.__runtime.build_request(
        "Initial",
        {
          "messages": messages,
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
        False,
      )
    
    async def LightbulbIsOff(
        self,
        
        baml_options: BamlCallOptions = {},
    ) -> baml_py.HTTPRequest:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb # type: ignore (we know how to use this private attribute)
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      return await self.__runtime.build_request(
        "LightbulbIsOff",
        {
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
        False,
      )
    
    async def LightbulbIsOn(
        self,
        
        baml_options: BamlCallOptions = {},
    ) -> baml_py.HTTPRequest:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb # type: ignore (we know how to use this private attribute)
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      return await self.__runtime.build_request(
        "LightbulbIsOn",
        {
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
        False,
      )
    


class AsyncHttpStreamRequest:
    __runtime: baml_py.BamlRuntime
    __ctx_manager: baml_py.BamlCtxManager

    def __init__(self, runtime: baml_py.BamlRuntime, ctx_manager: baml_py.BamlCtxManager):
      self.__runtime = runtime
      self.__ctx_manager = ctx_manager

    
    async def ExtractResume(
        self,
        resume: str,
        baml_options: BamlCallOptions = {},
    ) -> baml_py.HTTPRequest:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb # type: ignore (we know how to use this private attribute)
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      return await self.__runtime.build_request(
        "ExtractResume",
        {
          "resume": resume,
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
        True,
      )
    
    async def HelloWorld(
        self,
        
        baml_options: BamlCallOptions = {},
    ) -> baml_py.HTTPRequest:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb # type: ignore (we know how to use this private attribute)
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      return await self.__runtime.build_request(
        "HelloWorld",
        {
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
        True,
      )
    
    async def Initial(
        self,
        messages: List[types.Message],
        baml_options: BamlCallOptions = {},
    ) -> baml_py.HTTPRequest:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb # type: ignore (we know how to use this private attribute)
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      return await self.__runtime.build_request(
        "Initial",
        {
          "messages": messages,
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
        True,
      )
    
    async def LightbulbIsOff(
        self,
        
        baml_options: BamlCallOptions = {},
    ) -> baml_py.HTTPRequest:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb # type: ignore (we know how to use this private attribute)
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      return await self.__runtime.build_request(
        "LightbulbIsOff",
        {
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
        True,
      )
    
    async def LightbulbIsOn(
        self,
        
        baml_options: BamlCallOptions = {},
    ) -> baml_py.HTTPRequest:
      __tb__ = baml_options.get("tb", None)
      if __tb__ is not None:
        tb = __tb__._tb # type: ignore (we know how to use this private attribute)
      else:
        tb = None
      __cr__ = baml_options.get("client_registry", None)

      return await self.__runtime.build_request(
        "LightbulbIsOn",
        {
        },
        self.__ctx_manager.get(),
        tb,
        __cr__,
        True,
      )
    


__all__ = ["AsyncHttpRequest", "AsyncHttpStreamRequest"]