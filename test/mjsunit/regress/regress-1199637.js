// Copyright 2008 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Flags: --allow-natives-syntax

// Make sure that we can introduce global variables (using
// both var and const) that shadow even READ_ONLY variables
// in the prototype chain.
const NONE = 0;
const READ_ONLY = 1;

// Use DeclareGlobal...
%SetProperty(this.__proto__, "a", 1234, NONE);
assertEquals(1234, a);
eval("var a = 5678;");
assertEquals(5678, a);

%SetProperty(this.__proto__, "b", 1234, NONE);
assertEquals(1234, b);
eval("const b = 5678;");
assertEquals(5678, b);

%SetProperty(this.__proto__, "c", 1234, READ_ONLY);
assertEquals(1234, c);
eval("var c = 5678;");
assertEquals(5678, c);

%SetProperty(this.__proto__, "d", 1234, READ_ONLY);
assertEquals(1234, d);
eval("const d = 5678;");
assertEquals(5678, d);

// Use DeclareContextSlot...
%SetProperty(this.__proto__, "x", 1234, NONE);
assertEquals(1234, x);
eval("with({}) { var x = 5678; }");
assertEquals(5678, x);

%SetProperty(this.__proto__, "y", 1234, NONE);
assertEquals(1234, y);
eval("with({}) { const y = 5678; }");
assertEquals(5678, y);

%SetProperty(this.__proto__, "z", 1234, READ_ONLY);
assertEquals(1234, z);
eval("with({}) { var z = 5678; }");
assertEquals(5678, z);

%SetProperty(this.__proto__, "w", 1234, READ_ONLY);
assertEquals(1234, w);
eval("with({}) { const w = 5678; }");
assertEquals(5678, w);


